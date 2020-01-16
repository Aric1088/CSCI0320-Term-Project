from optparse import OptionParser
import difflib, io, os, subprocess, sys, tempfile, codecs
from io import open
from itertools import izip

sys.stdout = open(sys.stdout.fileno(), mode=u'w', encoding=u'utf8', buffering=1)

# color constants
END = u'\033[0m'
HEADER = u'\033[48;5;60m\033[38;5;15m'
TITLE = u'\033[1;30m'
FAIL = u'\033[0;31m'
CRASH = u'\033[1;31m'
SEP = u'\033[0;37m'
PASS = u'\033[0;32m'
GOOD = u'\033[38;5;107m'
BAD = u'\033[38;5;52m'

DIVIDER_WIDTH = 80

# Section tags in the test case
ARGS_TAG = u'ARGS'
INPUT_TAG = u'INPUT'
OUTPUT_TAG = u'OUTPUT'
SECTION_TAGS = [ARGS_TAG, INPUT_TAG, OUTPUT_TAG]
END_TAG = u'END'

# Message prefixes in the program's output
ERROR_PREFIX = u'ERROR:'
IGNORE_PREFIX = u'INFO:'

differ = difflib.Differ()


class TestFormatError(Exception):
    u"""Raised when a test file contains syntax errors."""

    def __init__(self, message):
        self.message = message


class Test(object):
    u"""An individual test case."""

    def __init__(self, executable, filepath, ignore_whitespace=False):
        if not os.path.isfile(executable):
            print u'Executable', executable, u'does not exist.'
            sys.exit(1)

        self.executable = executable

        if not os.path.isfile(filepath):
            print u'Test ', filepath, u'does not exist.'
            sys.exit(1)

        self.filename = os.path.basename(filepath)
        if self.filename.find(u'.') >= 0:
            self.name = self.filename[:self.filename.index(u'.')]

        try:
            sections = self.readtest(filepath, ignore_whitespace)
        except TestFormatError, tfe:
            print u'Failed to parse "{0}": {1}'.format(filepath, tfe.message)
            self.valid = False
            return

        self.valid = True
        self.args = sections[ARGS_TAG]
        self.input = sections[INPUT_TAG]
        self.expected = sections[OUTPUT_TAG]

        self.command = self.executable + u' ' + self.args
        if self.executable[-4:] == u'.jar':
            self.command = u'java -jar ' + self.command
        self.description = self.command

    @staticmethod
    def readtest(filename, ignore_whitespace=False):
        u"""Extract the ARGS, INPUT, and OUTPUT sections from a test file.

        Returns a dict with:
          ARGS_TAG -> str
          INPUT_TAG -> list of str
          OUTPUT_TAG -> list of str
        """
        sections = {
            ARGS_TAG: [],
            INPUT_TAG: [],
            OUTPUT_TAG: []
        }
        current_section = None

        with open(filename, u'r', encoding=u"utf-8") as file:
            lines = [line for line in file.readlines()]

            for idx, line in enumerate(lines):
                if line.startswith(END_TAG):
                    current_section = END_TAG
                    break
                elif any(line.startswith(tag) for tag in SECTION_TAGS):
                    current_section = line.rstrip()
                else:
                    sections[current_section].append(line.rstrip(u'\n') if not ignore_whitespace else line.rstrip())

            if len(sections[ARGS_TAG]) > 1:
                raise TestFormatError(u'All arguments under the ARGS tag must be on the same line.')
            elif len(sections[ARGS_TAG]) == 1:
                sections[ARGS_TAG] = sections[ARGS_TAG][0]
            else:
                sections[ARGS_TAG] = u""

            if current_section != END_TAG:
                raise TestFormatError(u'No END tag found. Every test file must contain an END tag.')

        return sections

    # For collapsing consecutive "ERROR: ..." lines down into one line
    @staticmethod
    def collapse_errors(lines):
        collapsed_lines = []
        prev_was_error = False
        for line in lines:
            if not line.startswith(u"ERROR:"):
                collapsed_lines.append(line)
                prev_was_error = False
            elif line.startswith(u"ERROR:") and not prev_was_error:
                collapsed_lines.append(u"ERROR:")
                prev_was_error = True
            else:  # Line is an error line, but we already added the previous line as an error
                continue
        return collapsed_lines

    @staticmethod
    def acceptable(expected, actual):
        expected = Test.collapse_errors(expected)
        actual = Test.collapse_errors(actual)
        if len(expected) != len(actual):
            return False
        for expected_line, actual_line in izip(expected, actual):
            if expected_line != actual_line:
                if not expected_line.startswith(u"ERROR:") or not actual_line.startswith(u"ERROR:"):
                    return False
        return True

    u"""
    Runs the test. Returns True if passed, False otherwise.
  
    @param timeout  time limit on waiting for a response from the student
                    executable (in seconds)
    """

    def run(self, timeout, ignore_whitespace):
        #print unicode(self.name)

        with tempfile.NamedTemporaryFile(mode=u'w+', encoding=u"utf-8") as temp:
            with tempfile.NamedTemporaryFile(mode=u'r+', encoding=u"utf-8") as input:
                # for line in self.input:
                # print(line, file=input)
                input.seek(0)

                try:
                    cp = subprocess.call([u"sh", u"-c", self.command], timeout=timeout,
                                         stdin=input, stdout=temp, stderr=subprocess.STDOUT)
                except subprocess.TimeoutExpired:
                    print u"%s timed out after %f seconds" % (self.name, timeout)
                    self.passed = False
                    return self.passed
                temp.seek(0)

                actual = []
                for line in temp:
                    if not line.startswith(IGNORE_PREFIX):
                        actual.append(line.rstrip(u'\n') if not ignore_whitespace else line.rstrip())

        passed = Test.acceptable(self.expected, actual)
        if not passed:
            # Only diff if the test failed (diff'ing will almost always point out ERROR tags)
            for line in differ.compare(self.expected, actual):
                if line[0:2] != u'  ':
                    print line

        print u'Result: ', (PASS + u'Passed' if passed else FAIL + u'Failed'), END
        print SEP + (u'-' * DIVIDER_WIDTH) + END

        self.passed = passed
        return self.passed


if __name__ == u'__main__':
    parser = OptionParser()
    parser.add_option(u'-t', u'--timeout', dest=u'timeout',
                      help=(u"The timeout (in seconds) to use when waiting for each test to run."
                            u" 5 by default."), type=u'float', default=5.0)
    parser.add_option(u'-e', u'--executable', dest=u'executable',
                      help=(u"The executable to test. `./run` by default."),
                      type=u'string', default=u'./run')
    parser.add_option(u'-i', u'--ignore-whitespace', action=u'store_true', dest=u'ignore_whitespace',
                      help=(u"Whether or not to ignore trailing whitespace. False (not ignored) by default."),
                      default=False)
    (opts, args) = parser.parse_args()

    if len(args) < 1:
        print u'Usage:', sys.argv[0], u'<test file> [<test file> ...]'
        print u'Run `', sys.argv[0], u' --help` for more options.'
        sys.exit(1)

    executable = opts.executable
    tests = [Test(executable, arg, opts.ignore_whitespace) for arg in args]

    passed = 0
    for test in tests:
        if test.valid:
            test.run(opts.timeout, opts.ignore_whitespace)
            if test.passed:
                passed += 1

    print END

    # Print summary
    print unicode(passed), u'/', unicode(len(tests)), u'tests passed' + END

    if passed == len(tests):
        print PASS + u'TEST SUITE PASSED' + END
    else:
        print FAIL + u'TEST SUITE FAILED' + END
