import java.util.Scanner;
import java.util.Arrays;

class sorting
{
static void udf(String arr[],int n)
{
int i,j;
for(i=0;i<n;i++)
{
for(j=i+1;j<n;j++)
{
if(arr[i].compareTo(arr[j])>0)
{
String temp=arr[i];
arr[i]=arr[j];
arr[j]=temp;
}
}
}
}
public static void main(String args[])
{
int i,j,l=0;
String[] s=new String[0];
Scanner sc=new Scanner(System.in);
while(true)
{
System.out.print("1.insert\n2.Build-in\n3.userdefined\n4.Exit");
int ch=sc.nextInt();
switch(ch)
{
case 1:
System.out.print("Enter the number of words :");
l=sc.nextInt();
s=new String[l];
	for(i=0;i<l;i++)
	{
	s[i]=sc.next();
	}
break;
case 2:
Arrays.sort(s);
System.out.print(""+Arrays.toString(s)+"\t");
break;
case 3:
udf(s,l);
System.out.print(""+Arrays.toString(s)+"\t");
break;
case 4:
System.exit(0);
default:
System.out.print("choose valid choice");
}
}

}
}