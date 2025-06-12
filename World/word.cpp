#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <locale>
#include <stdbool.h>

typedef struct par{
    char kar;
    int num;
}par;
std::vector<par> frekvens;
void tellPar(std::vector<std::string>& vekk);
void addToFrekvens(char c);
bool contains_any_char(const char str[], const char chars[]) {
    for (int i = 0; str[i] != '\0'; i++) {
        for (int j = 0; chars[j] != '\0'; j++) {
            if (str[i] == chars[j]) {
                return true;
            }
        }
    }
    return false;
}
void fil(std::vector<std::string>&);
int main(){
    
    std::vector<std::string> vekk;
    std::vector<std::string> reinVekk;
    auto utFil = fopen("5ord.txt", "w+");
    fprintf(utFil, "let ord = {\n");
    std::locale loc;
    std::string lower;
    fil(vekk);
    for(auto i : vekk){
        i.pop_back();
        //std::cout <<"\"" << i << "\", ";
        for(auto elem : i){
            lower.push_back(std::tolower(elem, loc));
            addToFrekvens(std::tolower(elem, loc));
        }
        fprintf(utFil, "\t\"");
        fprintf(utFil, lower.c_str());
        fprintf(utFil,  "\",\n");
        lower.clear();
    }
    
    for(auto tal : frekvens){
        printf("Bokstaven: %c, har %i stk\n", tal.kar, tal.num);
    }
    std::cout << std::endl << "Vekk er " << vekk.size() << " lång \n";
}
void fil(std::vector<std::string>& vektor){
    auto fil = fopen("words.txt", "r");
    char streng[256];
    
    while(fgets(streng, 128, fil) != NULL){
        if(strlen(streng) != 6) continue;
        if(contains_any_char(streng, ".-,'")) continue;
        if(strlen(streng) == 6){
            //std::cout << strlen(streng) << "\t" << streng << std::endl;
            vektor.push_back(streng);
        }
    }
}
void tellPar(std::vector<std::string>& vekk){
    for(auto i : vekk){
        for(auto bokstav : i){
            addToFrekvens(bokstav);
        }
    }
}
void addToFrekvens(char c){
    for(size_t i = 0; i < frekvens.size(); i++){
        if(frekvens[i].kar == c){
            frekvens[i].num++;
            return;
        }
    }
    par nytt = {c,1};
    frekvens.push_back(nytt);
}
