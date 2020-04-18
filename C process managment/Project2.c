#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <unistd.h>
#include <time.h>
#include <strings.h>
#include "Queue.h"

#define REQUEST_LEN 1000
#define BUFFER_LEN 100
#define F_SCAN_QUEUE_LEN 50
#define N_STEP_BUFFER_LEN 12


int FIFO(int requests[], int start_pos){
	int sum = 0;
	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){

		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			int index = i*BUFFER_LEN+j;
			int value = requests[index];
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		//handle buffer
		int start = start_pos;
		for(int k = 0; k < BUFFER_LEN; k++){
			sum += abs(buffer[k]-start);
			start = buffer[k];
		}

	}
	return sum;
}

int LIFO(int requests[],int start_pos){
	int sum = 0;
	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){

		//clear buffer
		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		//handle buffer		
		int start = start_pos;
		for(int k = BUFFER_LEN-1; k >= 0; k--){
			sum += abs(buffer[k] - start);
			start = buffer[k];
		}
	}
	return sum;
}

int SSTF(int requests[], int start_pos){

	int avg_request_distance = 0;

	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){
		//clear(create) buffer
		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		int start = start_pos;		

		int closest_index = 0;
		for(int l = 0; l< BUFFER_LEN; l++){
			for(int k = 0; k< BUFFER_LEN; k++){

				if(abs(buffer[closest_index] - start) > abs(buffer[k] - start)){
						//buffer[k] is closer
						//closest = buffer[k];
						closest_index = k;
					}
			}
			avg_request_distance += abs(buffer[closest_index]-start);
			start = buffer[closest_index];
			buffer[closest_index] = 500;
		}
	}	
	return avg_request_distance;
}

//sort function
int cmpfunc (const void * a, const void * b) {
   return ( *(int*)a - *(int*)b );
}


int C_SCAN(int requests[], int start_pos){
	int sum = 0;
	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){

		//clear buffer
		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		//handle buffer		
		int start = start_pos;
		//sort
		qsort(buffer, BUFFER_LEN, sizeof(int), cmpfunc);

		//calculate tracks after start point
		for(int k =0; k < BUFFER_LEN; k++){
			if(buffer[k]>=start){
				sum = sum + (buffer[k]-start);
				start = buffer[k];
				buffer[k] = -1;
			}
		}
		
		//calculate tracks from 0 index before start point
		if(buffer[0]!=(-1)){
			
			for(int k = 0; k<BUFFER_LEN; k++){
				if(buffer[k]==-1){
					break;
				}
				
				sum = sum+(abs(buffer[k]-start));
				start = buffer[k];
				buffer[k] = -1;
			}
		}
	}
	return sum;
}

int SCAN(int requests[], int start_pos, int buffer_len, int requests_len){
	int sum = 0;
	for(int i = 0; i < requests_len/buffer_len; i++){

		//clear/create buffer
		int buffer[buffer_len];

		//fill buffer
		for(int j = 0; j<buffer_len; j++){
			buffer[j] = requests[i*buffer_len+j];
		}

		//handle buffer	
		int return_index = -5; 	
		int start = start_pos;
		//sort
		qsort(buffer, buffer_len, sizeof(int), cmpfunc);

		//calculate tracks after start point
		for(int k =0; k < buffer_len; k++){
			if(buffer[k]>=start){
				if(return_index == -5)
					return_index = k - 1;
				sum = sum + (buffer[k]-start);
				start = buffer[k];
			}
		}

		if(return_index == -5)
			return_index = buffer_len-1;
		
		//analyze tracks ignored by previous
		for(int k = return_index; k >= 0; k--){
			sum += abs(buffer[k] - start);
			start = buffer[k];
		}		
	}

	return sum;	
}

int N_STEP_SCAN(int requests[], int start_pos){
	int sum = 0;
	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){

		//clear buffer
		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		//split buffer BUFFER_LEN / N_STEP_BUFFER_LEN number of times
		int c = (int)ceil((double)BUFFER_LEN/(double)N_STEP_BUFFER_LEN);
		for(int j = 0; j < c; j++){

			int n_step_buffer[N_STEP_BUFFER_LEN];
			int last_index = 0;
			//for each n_step_buffer
			for(int k = 0; k < N_STEP_BUFFER_LEN; k++){
				if(j*N_STEP_BUFFER_LEN+k < BUFFER_LEN){
					n_step_buffer[k] = buffer[j*N_STEP_BUFFER_LEN+k];
					last_index++;
				}else
				{
					break;
				}									
			}
			//last_index will usually == N_STEP_BUFFER_LEN
			sum += SCAN(n_step_buffer, start_pos, last_index, last_index);
		}		
	
	}
	return sum;
}


int F_SCAN(int requests[], int start_pos, int sub_buffer_len){
	int sum = 0;
	for(int i = 0; i < REQUEST_LEN/BUFFER_LEN; i++){

		//clear buffer
		int buffer[BUFFER_LEN];

		//fill buffer
		for(int j = 0; j<BUFFER_LEN; j++){
			buffer[j] = requests[i*BUFFER_LEN+j];
		}

		//treat buffer as request for the F_SCAN
		//make F_SCAN subb-buffer
		struct Queue* sub_queue_0 = createQueue(sub_buffer_len);
		struct Queue* sub_queue_1 = createQueue(sub_buffer_len);
		int turn = 0; // 0 or 1 denotating is turn to fill
		
		for(int k = 0; k<BUFFER_LEN;k++){

			if(turn == 0){
				enqueue(sub_queue_0, buffer[k]);

				if(isFull(sub_queue_0) || k == BUFFER_LEN-1){
				//handle
					int temp_buff[sub_buffer_len];
					int temp_index = 0;
					while(!isEmpty(sub_queue_0)){
						temp_buff[temp_index] = dequeue(sub_queue_0);
						temp_index++;
					}
					free(sub_queue_0);
					sub_queue_0 = createQueue(sub_buffer_len);
					sum += SCAN(temp_buff, start_pos, temp_index, temp_index);
					turn = 1;
				}
			}else{
				enqueue(sub_queue_1, buffer[k]);
				if(isFull(sub_queue_1) || k == BUFFER_LEN-1){
				//handle
					int temp_buff[sub_buffer_len];
					int temp_index = 0;
					while(!isEmpty(sub_queue_1)){
						temp_buff[temp_index] = dequeue(sub_queue_1);
						temp_index++;
					}
					free(sub_queue_1);
					sub_queue_1 = createQueue(sub_buffer_len);
					sum += SCAN(temp_buff, start_pos, temp_index, temp_index);
					turn = 0;					
				}
			}
		}
	}
	return sum;
}

int Custom_Number_Gen(int num){

	// what side is bigger | left ? right
	int biggest_side = (num>(199-num) ? num : 199 - num);

	double ratio = (double)9000/biggest_side;

	int probability = (rand() % 10000)+1;
	
	int right = rand() % 2; // 1 == right | 0 == left

	if(probability <= 1000)
	{
		return num;
	}
	else 
	{		
		int num_steps = (probability - 1000) / ratio;
		int new_num = num;
		if(right){
			new_num += num_steps;
			if(new_num > 199)
				new_num = num - num_steps;
		}
		else{//left
			new_num -= num_steps;
			if(new_num<0)
				new_num = num + num_steps; 
		}
		return new_num;
	}
}

int main(){

	srand(time(0));

	// [round][scheduling algorithm][starting position]
	// 14 scheduling because each is run twice...
	// once with requests, once with custom_requests
	double results[5][14][3];

	for(int round = 0; round < 5; round++){

		//create two request arrays each round

		//random
		int request[REQUEST_LEN];
		for(int i = 0; i < REQUEST_LEN; i++){
			request[i] = (rand() % 200);
		}

		//custom
		int custom_requests[REQUEST_LEN];
		int start_num = rand() % 200;
		custom_requests[0] = start_num;
		for(int i = 1; i < REQUEST_LEN; i++){
			custom_requests[i] = Custom_Number_Gen(custom_requests[i-1]);
		}

		int start_pos[3] = {0, 100, 199};

		//run each scheduling algorithm TWICE at each of the 3 starting positions
		for(int i = 0; i < 3; i++){

			
			results[round][0][i] = ((double)FIFO(request, start_pos[i])/REQUEST_LEN);
			results[round][1][i] += ((double)LIFO(request, start_pos[i])/REQUEST_LEN);
			results[round][2][i] += ((double)SSTF(request, start_pos[i])/REQUEST_LEN);
			results[round][3][i] += ((double)C_SCAN(request, start_pos[i])/REQUEST_LEN);
			results[round][4][i] += ((double)SCAN(request, start_pos[i], BUFFER_LEN, REQUEST_LEN)/REQUEST_LEN);
			results[round][5][i] += ((double)N_STEP_SCAN(request, start_pos[i])/REQUEST_LEN);
			results[round][6][i] += ((double)F_SCAN(request, start_pos[i], F_SCAN_QUEUE_LEN)/REQUEST_LEN);

			results[round][7][i] += ((double)FIFO(custom_requests, start_pos[i])/REQUEST_LEN);
			results[round][8][i] += ((double)LIFO(custom_requests, start_pos[i])/REQUEST_LEN);
			results[round][9][i] += ((double)SSTF(custom_requests, start_pos[i])/REQUEST_LEN);
			results[round][10][i] += ((double)C_SCAN(custom_requests, start_pos[i])/REQUEST_LEN);
			results[round][11][i] += ((double)SCAN(custom_requests, start_pos[i], BUFFER_LEN, REQUEST_LEN)/REQUEST_LEN);
			results[round][12][i] += ((double)N_STEP_SCAN(custom_requests, start_pos[i])/REQUEST_LEN);
			results[round][13][i] += ((double)F_SCAN(custom_requests, start_pos[i], F_SCAN_QUEUE_LEN)/REQUEST_LEN);
		}

	}

	double r[14][3];
	for(int i = 0; i < 14; i++){
		for(int j = 0; j<3; j++){
			//average of the 5 rounds
			r[i][j] = 0.0;
			r[i][j] += results[0][i][j];
			r[i][j] += results[1][i][j];
			r[i][j] += results[2][i][j];
			r[i][j] += results[3][i][j];
			r[i][j] += results[4][i][j];
			r[i][j] = r[i][j]/5.0;
		}
	}

	//========PRINT RESULTS========//
	printf("\n\nRANDOM REQUEST LIST\n");
	printf("|---------------------------------------|\n");
	printf("|START POS|    0    |   100   |   199   |\n");
	printf("|---------|---------|---------|---------|\n");
	printf("|   FIFO  |%-9.2f|%-9.2f|%-9.2f|\n",r[0][0],r[0][1],r[0][2]);	
	printf("|---------|---------|---------|---------|\n");
	printf("|   LIFO  |%-9.2f|%-9.2f|%-9.2f|\n",r[1][0],r[1][1],r[1][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("|   SSTF  |%-9.2f|%-9.2f|%-9.2f|\n",r[2][0],r[2][1],r[2][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| C_SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[3][0],r[3][1],r[3][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("|   SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[4][0],r[4][1],r[4][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| N_STEP  |%-9.2f|%-9.2f|%-9.2f|\n",r[5][0],r[5][1],r[5][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| F_SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[6][0],r[6][1],r[6][2]);
	printf("|---------------------------------------|\n\n");
	printf("CUSTOM REQUEST LIST\n");
	printf("|---------------------------------------|\n");
	printf("|START POS|    0    |   100   |   199   |\n");
	printf("|---------|---------|---------|---------|\n");
	printf("|   FIFO  |%-9.2f|%-9.2f|%-9.2f|\n",r[7][0],r[7][1],r[7][2]);	
	printf("|---------|---------|---------|---------|\n");
	printf("|   LIFO  |%-9.2f|%-9.2f|%-9.2f|\n",r[8][0],r[8][1],r[8][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("|   SSTF  |%-9.2f|%-9.2f|%-9.2f|\n",r[9][0],r[9][1],r[9][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| C_SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[10][0],r[10][1],r[10][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("|   SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[11][0],r[11][1],r[11][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| N_STEP  |%-9.2f|%-9.2f|%-9.2f|\n",r[12][0],r[12][1],r[12][2]);
	printf("|---------|---------|---------|---------|\n");
	printf("| F_SCAN  |%-9.2f|%-9.2f|%-9.2f|\n",r[13][0],r[13][1],r[13][2]);
	printf("|---------------------------------------|\n\n");

	return(0);
}