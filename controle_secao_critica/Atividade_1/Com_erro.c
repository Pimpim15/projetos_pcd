#include<stdio.h>
#include<stdlib.h>
#include<omp.h> 
#include <unistd.h>

#define NTHREADS 4
#define MAX_REQUESTS 1000000

int soma=0, cliente;
unsigned int atual = 1;

// Rotina de execussao do cliente
void Client_process(int cliente){
    while(atual <= NTHREADS){
        // Entra na sessao critica
        int local = soma;
        usleep(rand()%2);
        soma = local + 1;
        // Sai da sessao critica
        printf("Thread %d: Soma = %d Requests: %d\n",cliente,soma,atual);
        atual++;
    }
}

int main(){
    int i;
    #pragma omp parallel private(cliente) num_threads(NTHREADS)
    #pragma omp for
        for(i=0;i<NTHREADS;i++) Client_process(i);
    return 0;
}
