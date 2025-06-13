import java.util.Scanner;
class genericSort
{
public static <T extends Comparable<T>> void Sort(T[] arr)
{
int n=arr.length;
int i,j;
for(i=0;i<n-1;i++)
{
for(j=0;j<n-i-1;j++)
{
if(arr[j].compareTo(arr[j+1])>0)
{
T temp=arr[j];
arr[j]=arr[j+1];
arr[j+1]=temp;
}
}
}
}

public static <T> void printArray(T[] arr,int length)
{
for(T word : arr)
{
System.out.print(word+"\n");
}
}

 public static void main(String args[])
{
Scanner sc=new Scanner(System.in);
System.out.print("Enter number of elements :");
int n=sc.nextInt(),i;
Integer [] arr=new Integer[n];
for(i=0;i<n;i++)
{
arr[i]=sc.nextInt();
}
Sort(arr);
printArray(arr,n);
}
}

