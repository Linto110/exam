import java.util.Scanner;


class product
{

String pname;
int pcode,price;
product(String name,int code,int pprice)
{
pname=name;
pcode=code;
price=pprice;
}
}
class price
{
public static void main(String args[])
{
String name;
int code,pprice;
Scanner sc=new Scanner(System.in);
product p=new product("plate",100,110);
System.out.print("Enter the product name :");
name=sc.next();
System.out.print("Enter the product code :");
code=sc.nextInt();
System.out.print("Enter the price :");
pprice=sc.nextInt();
product p1=new product(name,code,pprice);
name="pen";
code=101;
pprice=10;
product p2=new product(name,code,pprice);
System.out.println("Product with lowest price \n ____________________");
if(p.price<p1.price  && p.price<p2.price)
{
System.out.println("Product "+p.pname+" have lowest price ="+p.price);
}
else if(p1.price<p.price && p1.price < p2.price){
System.out.print("Product "+p1.pname+" have lowest price ="+p1.price);
}
else{
System.out.print("Product "+p2.pname+" have lowest price ="+p2.price);
}

}

}