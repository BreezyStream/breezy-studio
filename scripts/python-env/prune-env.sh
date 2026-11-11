#!/bin/bash

#
# Removes what a packed environment doesn't need at runtime: headers, docs,
# build tools, debug symbols, the stdlib GUI/test modules and PyTorch's
# C++ headers. Package "test" folders are kept, some packages import them.
#
#   bash ./scripts/python-env/prune-env.sh python/mac
#

set -e

OUT=$1

if [ -f "$OUT/python.exe" ]; then
	LIB=$OUT/Lib
else
	LIB=$OUT/lib/python3.12
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
	"$SP/torch/include" \
	"$SP/torch/share/cmake"

find "$OUT" -type f \( -name "*.pdb" -o -name "*.a" -o -name "*.lib" \) -delete

# Links into removed folders (e.g. lib/terminfo -> share/terminfo) break
# code signing.
find "$OUT" -type l ! -exec test -e {} \; -delete
