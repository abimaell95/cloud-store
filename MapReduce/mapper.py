#!/usr/bin/python
  
# import sys because we need to read and write data to STDIN and STDOUT
import sys
import csv
  
# reading entire line from STDIN (standard input)
reader = csv.reader(sys.stdin, delimiter=',')
for line in reader:
    eventType = line[1]
    if(eventType == 'purchase'):
        brand = line[5]
        price = line[6]
        if(brand != '' and price!=''):
            print('%s\t%s\t%s' % (brand, price, 1))