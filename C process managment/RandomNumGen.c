#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>
#include <time.h>


int main(){

	srand(time(0));

	int num = rand() % 200;

	// what side is bigger | left ? right
	int biggest_side = (num>(199-num) ? num : 199 - num);

	int ratio = 9000/biggest_side;

	int probability = rand() % 10000+1;
	
	int left_or_right = rand() % 2;

	printf("Random number: %d\n",num);
	printf("ratio: %d\n",ratio);
	printf("Biggest side: %d\n",biggest_side);
	printf("%s\n", (left_or_right ? "RIGHT":"LEFT"));
	printf("Probability: %d\n", probability);

	if(probability <= 1000)
	{
		printf("NUM didnt change\n");
	}
	else 
	{		
		int num_steps = (probability - 1000) / ratio;
		int new_num = num;
		if(left_or_right){//right
			new_num += num_steps;
			if(new_num > 199)
				new_num = num - num_steps;
		}
		else{//left
			new_num -= num_steps;
			if(new_num<0)
				new_num = num + num_steps;
		}

		printf("NUM changed: %d\n",new_num);
	}

	

}