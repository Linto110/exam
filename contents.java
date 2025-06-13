import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import java.io.FileWriter;
class contents
{
public static void main(String args[])
{
StringBuilder sb=new StringBuilder();
Scanner sc=new Scanner(System.in);

System.out.print("Enter the content(exit to stop) :");
String word;
while(!(word=sc.nextLine().trim()).equals("exit"))
sb.append(word).append(System.lineSeparator());


//write
try(FileWriter fw=new FileWriter("out.txt")){
fw.write(sb.toString());
}
catch(IOException e)
{
System.err.print("Error :"+e);
}
//rea
try(Scanner scc=new Scanner(new File("out.txt")))
{
while(scc.hasNextLine())
{
System.out.println(scc.nextLine());
}
}
catch(IOException e){
System.err.print("Error :"+e);
}

 
}



}