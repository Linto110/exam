import java.util.Scanner;

class A extends Thread
{
public void run()
{
int i;
for(i=1;i<=10;i++)
{
System.out.print(i+" * 5 ="+(i*5));
}
}
}

class B extends Thread
{
public void run()
{
Scanner sc=new Scanner(System.in);
System.out.print("Enter number of prime numbers :");
int n=sc.nextInt();
int count=0,num=2;
while(count<n)
{
if(isPrime(num))
{
System.out.print(num+"\n");
count++;
}
num++;
}
}
	boolean isPrime(int n)
	{
		if(n<2)
		{
		return false;
		}
int i;
for(i=2;i<=Math.sqrt(n);i++)
if(n%i==0)
return false;
return true;
	}
}
class threadOp
{
public static void main(String args[])
{
B p=new B();
A m=new A();
p.start();
m.start();
}
}