import java.util.Scanner;
class cpu
{

int price;
class processor
{
int no_of_cores;
String manufacturer;
void display()
{
System.out.print("System no_of_cores :"+no_of_cores);
System.out.print("System manufacturer :"+manufacturer);
}
}

static class Ram{
int memory;
String manufacturer;
void display()
{
System.out.print("System memory :"+memory);
System.out.print("Memory manufacturer :"+manufacturer);
}
}
void display()
{
System.out.print("price :"+price);
}
}
class cpuinfo
{
public static void main(String args[])
{
Scanner sc=new Scanner(System.in);
cpu ncpu=new cpu();
cpu.processor processor=ncpu.new processor();
cpu.Ram ram=new cpu.Ram();
System.out.print("Enter no_of_cores :");
processor.no_of_cores=sc.nextInt();
System.out.print("Enter system manufacturer :");
processor.manufacturer=sc.next();
System.out.print("Enter memory space :");
ram.memory=sc.nextInt();
System.out.print("Enter system manufacturer :");
ram.manufacturer=sc.next();
System.out.print("Enter system price :");
ncpu.price=sc.nextInt();
processor.display();
ram.display(); 
ncpu.display();
}
}