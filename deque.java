import java.util.Scanner;
import java.util.ArrayDeque;
import java.util.Deque;

class deque
{
public static void main(String args[])
{
int i;
Deque <String> dq=new ArrayDeque<>();
Scanner sc=new Scanner(System.in);
System.out.print("Enter number of elements :");
int n=sc.nextInt();
for(i=0;i<n;i++)
{
System.out.print("Enter "+(i+1)+" word :");
String word=sc.next();
dq.add(word);
}
System.out.print("The array :");
for(String w : dq)
{
System.out.print(w+" ");
}

System.out.print("Removal using (remove)"+dq.remove());
System.out.print("Removal using (poll)"+dq.poll());
System.out.print("Removal using (polllast)"+dq.pollLast());
}
}