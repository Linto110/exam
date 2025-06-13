import java.awt.*;
import java.awt.event.*;
import java.applet.Applet;



public class Housedoor extends Applet
{
private Color doorcolor=Color.BLUE;

public void init(){
addMouseListener(new MouseAdapter(){
public void mouseClicked(MouseEvent e){
if(doorcolor==Color.BLUE){
doorcolor=Color.RED;
}
else{
doorcolor=Color.BLUE;
}
repaint();
}
});
}

public void paint(Graphics g)
{
g.setColor(Color.YELLOW);
g.fillRect(100,200,200,150);

g.setColor(Color.RED);
int []  xpoints={100,200,300};
int[] ypoints={200,100,200};
g.fillPolygon(xpoints,ypoints,3);


g.setColor(doorcolor);
g.fillRect(170,270,60,80);
}

public static void main(String args[])
{
    Frame frame = new Frame("House Applet");  // ✅ FIXED LINE
    frame.add(applet);
    frame.setSize(500, 500);
    frame.setVisible(true);
}
}