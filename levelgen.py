from sys import stdin
import unittest


level = {}
# construct id
print "Enter level number:"
level['id'] = int(stdin.readline())

#construct title
print "Enter level title:"
level['title'] = stdin.readline()

#construct width
print "Enter width:"
level['width'] = int(stdin.readline())

#construct height
print "Enter height:"
level['height'] = int(stdin.readline())

level['map'] = []
#construct map
for i in range(level['height']):
	print "Enter row: " + str(i)
	level['map'].append(stdin.readline().rstrip('\n'))

#construct description
print "Enter description"
level['description'] = stdin.readline()

#construct objects
print "Enter Object"
level ['objects'] = []

#construct goal
print "Enter goal"
level['goal'] = stdin.readline()

print level

class MyTest(unittest.TestCase):
    def test(self):
        self.assertEqual(fun(3), 4)
        self.assertEqual(fun(5), 6)


# if __name__ == '__main__':
#     unittest.main()