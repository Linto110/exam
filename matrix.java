import java.util.Scanner;


class Matrix
{
public static void main(String args[])
{
int i,j;
Scanner sc=new Scanner(System.in);
System.out.print("Enter the row size :");
int n1=sc.nextInt();
System.out.print("Enter the column size :");
int n2=sc.nextInt();
int[][] matrix1=new int[n1][n2];
int[][] matrix2=new int[n1][n2];
int[][][] arr={matrix1,matrix2};
int matrixnum=1;
for(int[][] item :arr)
{
	System.out.print("Enter matrix"+matrixnum+ " elements :");
	for(i=0;i<n1;i++)
	{
	for(j=0;j<n2;j++)
	{
		item[i][j]=sc.nextInt();
	}
	}
matrixnum++;
}
matrixnum=1;
	for(int[][] item:arr)
	{
System.out.print("Matrix"+matrixnum);
	for(i=0;i<n1;i++)
	{
	for(j=0;j<n2;j++)
	{
		System.out.print(item[i][j]+ " ");
	}
System.out.println();
	}
matrixnum++;
	}
}
}