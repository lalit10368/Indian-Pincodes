#!/bin/bash
input="./required_pincodes.csv"
file1="./pincodes_raw.txt"
file2="./pincodes.txt"
while IFS= read -r line
do
    grep -w "$line" $file1
done < "$input"
