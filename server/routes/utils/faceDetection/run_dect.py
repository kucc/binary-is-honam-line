import attend_check
import sys


def main(argv):
    check = attend_check.attend_check()
    js = check.detect_member(argv)

    print(js)


if __name__ == "__main__":
    main(sys.argv[1:])
