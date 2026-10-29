#!/bin/bash

#
# Removes what a packed environment doesn't need at runtime: headers, docs,
# build tools, debug symbols, the stdlib GUI/test modules and TensorFlow's
# unused libclang dependency. Package "test" folders are kept, TensorFlow
# imports some of them.
#
#   bash ./scripts/python-env/prune-env.sh python/mac
#

set -e

OUT=$1

if [ -f "$OUT/python.exe" ]; then
	LIB=$OUT/Lib
else
	LIB=$OUT/lib/python3.10
fi

SP=$LIB/site-packages

rm -rf \
	"$OUT/include" \
	"$OUT/share" \
	"$OUT/man" \
	"$OUT/conda-meta" \
	"$OUT/Tools" \
	"$OUT/libs" \
	"$OUT/Library/include" \
	"$OUT/Library/share" \
	"$OUT/lib/tcl8.6" \
	"$OUT/lib/tk8.6" \
	"$OUT/tcl"

rm -rf \
	"$LIB/test" \
	"$LIB/idlelib" \
	"$LIB/tkinter" \
	"$LIB/turtledemo" \
	"$LIB/ensurepip" \
	"$LIB/lib2to3/tests"

rm -rf \
	"$SP/pip" "$SP"/pip-*.dist-info \
	"$SP/clang" "$SP"/libclang-*.dist-info \
	"$SP/tensorflow/include"

find "$OUT" -type f \( -name "*.pdb" -o -name "*.a" -o -name "*.lib" \) -delete

# Links into removed folders (e.g. lib/terminfo -> share/terminfo) break
# code signing.
find "$OUT" -type l ! -exec test -e {} \; -delete
