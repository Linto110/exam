import java.util.Scanner;

interface sports
{
void getsportsScore();
}
interface academic
{
void getAcademicScore();
}
 class score implements sports,academic
{
Scanner sc=new Scanner(System.in);
int acadmicScore,sportsScore;
public void getsportsScore()
{
System.out.print("Enter the sportts score :");
sportsScore=sc.nextInt();
}
public void getAcademicScore()
{
System.out.print("Enter the acdemic score :");
acadmicScore=sc.nextInt();
}
void display()
{
getAcademicScore();
getsportsScore();
System.out.print("Academic score :"+acadmicScore+ " sports Score :"+sportsScore);
}

}

class Result
{
public static void main(String args[])
{
score s=new score();
s.display(); 
}
}