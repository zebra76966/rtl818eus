print("********** Horizontal pixel span Fill ********")
# Function for calulating left end's start==>
def Horizontal_Span(x ,y, boundary, fill):
    stack=[]
    coor=x,y
    def findL(x ,y, boundary, fill):
        coordinate=x,y
        left=False
        while left!=True:
            coordinate=x,y
            if img.getpixel(coordinate) != boundary and img.getpixel(coordinate) != fill:
                x=x-1
            else:
                coordinate=x+1,y
                left=True
                return coordinate
# Function for calulating left end's End==>

    stack.append(findL(x ,y, boundary, fill))
    # ADDING SEED'S LEFT END POINTS TO THE STACK

    chk=0
    coordinate=x,y

    # VARIABLES TO COUNTER RECHECKING OF TOP AND BOTTOM SPAN OVERALL INCREASING PERFOMANCE BY LITTLE
    foundUp=0
    foundDown=0

    while len(stack)!=0:
        coordinate=x,y

        x=coordinate[0]
        y=coordinate[1]

        # FILLING SPANNED AREA WHILE CHECKING THE BOUNDARY AND FILL
        if img.getpixel(coordinate) != boundary and img.getpixel(coordinate) != fill:
            img.putpixel( (x,y), fill )

            # CHECKING FOR UPPER SPAN AND APPENDING TO STACK THERE LEFT END =>
            if img.getpixel((x,y+1)) != boundary and img.getpixel((x,y+1)) != fill and foundUp==0 :
                stack.append(findL(x ,y+1, boundary, fill))
                foundUp=1
            else:
                foundUp=0
            # CHECKING FOR BOOTOM SPAN AND APPENDING TO STACK THERE LEFT END =>
            if img.getpixel((x,y-1)) != boundary and img.getpixel((x,y-1)) != fill and foundDown==0:
                stack.append(findL(x ,y-1, boundary, fill))
                foundDown=1
            else:
                foundDown=0

            x=x+1
        else:
            foundDown = foundUp =0
            stack.pop(0)
            # UPDATING FROM STACK
            if len(stack)!=0:
                coordinate=stack[0]
                x=coordinate[0]
                y=coordinate[1]

# CREATING A OJECT FOR DEMONSTRATION
win = GraphWin("Horizontal pixel span Fill", 150, 150)
win.setBackground("black")

aRectangle = Rectangle(Point(5,5), Point(115,95))
aRectangle.setOutline("blue")
aRectangle.setFill("black")
aPolygon = Polygon([
                    Point(10,10), Point(50,10), Point(50,40),
                    Point(70,40), Point(70,10), Point(110,10),
                    Point(110,90), Point(70,90), Point(70,60),
                    Point(50,60), Point(50,90), Point(10,90),
                    ])
aPolygon.setOutline("blue")
aPolygon.setFill("black")

aRectangle.draw(win)
aPolygon.draw(win)

win.postscript(file="image.eps", colormode='color')

from PIL import Image as NewImage
img = NewImage.open("image.eps")

#CALLING Function
Horizontal_Span(30,30,(0,0,255),(255,0,0))
print("Horizontal_Span  Completed!")
img.show()
