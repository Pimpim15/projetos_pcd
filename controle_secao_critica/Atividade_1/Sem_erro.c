#include<stdio.h>
#include<stdlib.h>
#include<omp.h> 
#include <unistd.h>

#define NTHREADS  4
#define NREQUESTS 1000000

int soma=0, respond=0, request=0, cliente;
unsigned int atual = 1;

// Rotina de execussao do cliente
void Client_process(int cliente){
    while(atual <= NREQUESTS){
        while(respond!=cliente){
            if(atual == NREQUESTS) return;
            request=cliente;
        }
        // Entra na sessao critica
        int local = soma;
        usleep(rand()%2);
        soma = local + 1;
        // Sai da sessao critica
        printf("Thread %d: Soma = %d Requests: %d\n",cliente,soma,atual);
        respond=0;
        atual++;
    }
}

// Rotina de execussao do cliente
void Server_process(int cliente){
    while(atual <= NREQUESTS){
        while(request==0){
            if(atual == NREQUESTS) return;
        }
        respond=request;
        while(respond!=0);
        request=0;
    }
}

int main(){
    int i;

    #pragma omp parallel private(cliente) num_threads(NTHREADS)
    #pragma omp for
    for(i=0;i<NTHREADS;i++){
        if(i == 0) Server_process(i);
        else Client_process(i);
    }
    printf("Fim da execucao!\n");
    return 0;
}
