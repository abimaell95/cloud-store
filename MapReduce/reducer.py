#!/usr/bin/python


from operator import itemgetter
import sys
  
current_brand = None
current_price = 0
current_count = 0
brand = None
 
# read the entire line from STDIN
for line in sys.stdin:
    # remove leading and trailing whitespace
    data_mapped = line.strip().split("\t")
    if len(data_mapped) != 3:
        # Something has gone wrong. Skip this line.
        continue
    # slpiting the data on the basis of tab we have provided in mapper.py
    brand, price, count = data_mapped
    # convert price (currently a string) to float
    try:
        price = float(price)
        count = int(count)
    except ValueError:
        # price was not a number, so silently
        # ignore/discard this line
        continue
  
    # this IF-switch only works because Hadoop sorts map output
    # by key (here: word) before it is passed to the reducer
    if current_brand == brand:
        current_price += price
        current_count += count
    else:
        if current_brand:
            # write result to STDOUT
            print('%s\t%s\t%s' % (current_brand, current_price, current_count))
        current_price = price
        current_brand = brand
        current_count = count
  
# do not forget to output the last word if needed!
if current_brand == brand:
    print('%s\t%s\t%s' % (current_brand, current_price, current_count))