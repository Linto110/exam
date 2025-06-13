import java.util.Scanner;

class product
{
String pname;
int pcode,pprice;
product(String name,int code,int price)
{
pname=name;
pcode=code;
pprice=price;
}
}

class price
{
public static void main(String args[])
{
Scanner sc=new Scanner(System.in);
String name;
int code,price;
product p1=new product("soap",001,100);
System.out.print("Enter the product name :");
name=sc.nextLine();
System.out.print("Enter the product code :");
code=sc.nextInt();
System.out.print("Enter the product price :");
price=sc.nextInt();
product p2=new product(name,code,price);
name="pen";
code=003;
price=10;
product p3=new product(name,code,price);
product[] obj={p1,p2,p3};
System.out.print("Product details \n ------------------");
for(product prod:obj){
System.out.print("Name :"+prod.pname+" code :"+prod.pcode+" price :"+prod.pprice);
System.out.println();
}
product m=obj[0];
System.out.print("Product with minium price :");
for(product p:obj)
{
if(p.pprice<m.pprice){
m=p;
}
}
System.out.print("\nName :"+m.pname+" code :"+m.pcode+" price :"+m.pprice);
}
}