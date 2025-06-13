import java.util.Scanner;
class shape
{
double area(double r)
{
return r*r;
}
int area(int s)
{
return s*s;
}
int area(int l,int b)
{
return l*b;
}
public static void main(String args[])
{
Scanner sc=new Scanner(System.in);
int l,b,s;
shape a=new shape();
System.out.print("Enter the radius :");
double r=sc.nextInt();
System.out.print("Enter the side of square :");
s=sc.nextInt();
System.out.print("Enter the length or rectangle:");
l=sc.nextInt();
System.out.print("Enter the breadth of reactangle :");
b=sc.nextInt();
System.out.print("\nArea of circle :"+a.area(r));
System.out.print("\nArea of square :"+a.area(s));
System.out.print("\nArea of rectangle :"+a.area(l,b));


}
}
