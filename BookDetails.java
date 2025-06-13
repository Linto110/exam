import java.util.Scanner;
class publisher
{
String publisher;
}
class Book extends publisher
{
String title,author;
int price;
}
class Fiction extends Book
{
String genre;
void display()
{
System.out.print("Book name :"+title+"\nBook publisher :"+publisher+"\nBook author :"+author+"\nprice :"+price+"\nGenre :"+genre);
}
}


class Literature extends Book
{
String genre;
void display()
{
System.out.print("Book name :"+title+"\nBook publisher :"+publisher+"\nBook author :"+author+"\nprice :"+price+"\nGenre :"+genre);
}
}


class BookDetails
{
public static void main(String args[])
{
Scanner sc=new Scanner(System.in);
while(true)
{
System.out.print("1.Literature\n2.Fiction\n3.Exit\nEnter your choice :");
int n=sc.nextInt();
if(n==3)
{
System.exit(0);
}
System.out.print("Enter Book name :");
String name=sc.next();
System.out.print("Enter Book author :");
String author=sc.next();
System.out.print("Enter Book price :");
int price=sc.nextInt();
System.out.print("Enter Book publisher :");
String publisher=sc.next();
switch(n)
{
case 1:
Fiction f=new Fiction();
f.title=name;
f.author=author;
f.price=price;
f.publisher=publisher;
f.genre="Literature";
f.display();
break;
case 2:
Literature l=new Literature();
l.title=name;
l.author=author;
l.price=price;
l.publisher=publisher;
l.genre="Fiction";
l.display();
break;
}
}
}
}