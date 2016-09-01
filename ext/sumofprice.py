import sys, json

total = 0
input_str = ''
for line in sys.stdin:
  input_str += line

rows = json.loads(input_str)

for c in rows:
     total += float(c["retailPrice"])
print total
