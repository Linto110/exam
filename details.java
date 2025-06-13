import java.util.Scanner;
class employee
{
int empid,salary;
String address,name;
employee(int id,int sa, String add,String na)
{
empid=id;
salary=sa;
address=add;
name=na;
}
}
class Teacher extends employee
{
String department,subject;
Teacher(int id,int sa,String add,String na,String dep,String sub)
{
super(id,sa,add,na);
department=dep;
subject=sub;
}
void display()
{
System.out.print("empid :"+empid+" name :"+name+" address :"+address+" salary :"+salary+" department :"+department+" subject :"+subject);
}
}

class details
{
public static void main(String args[])
{
int i;
Scanner sc=new Scanner(System.in);
String name,address,subject,department;
int empid,salary;
System.out.print("Enter the number of records :");
int ch=sc.nextInt();
Teacher[] T=new Teacher[ch];
for(i=0;i<ch;i++)
{
System.out.print("Enter the Employee id:");
empid=sc.nextInt();
System.out.print("Enter the Employee name:");
name=sc.next();
System.out.print("Enter the Employee address:");
address=sc.next();
System.out.print("Enter the Employee subject:");
subject=sc.next();
System.out.print("Enter the Employee department:");
department=sc.next();
System.out.print("Enter the Employee salary:");
salary=sc.nextInt();
T[i]=new Teacher(empid,salary,address,name,department,subject);
}
System.out.print("The employee records :");
for(i=0;i<ch;i++)
{
T[i].display();
}
}
}