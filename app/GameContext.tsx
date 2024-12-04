import React, { createContext, useState, useContext, ReactNode } from 'react';

   interface Round {
     id: string;
     scores: number[];
   }

   interface GameContextType {
     rounds: Round[];
     updateRound: (id: string, scores: number[]) => void;
     deleteRound: (id: string) => void;
     addRound: (round: Round) => void;
   }

   const GameContext = createContext<GameContextType | undefined>(undefined);

   export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [rounds, setRounds] = useState<Round[]>([/* initial rounds data */]);

     const updateRound = (id: string, scores: number[]) => {
       setRounds(prevRounds => prevRounds.map(round => round.id === id ? { ...round, scores } : round));
     };

     const deleteRound = (id: string) => {
       setRounds(prevRounds => prevRounds.filter(round => round.id !== id));
     };

     const addRound = (round: Round) => {
       setRounds(prevRounds => [...prevRounds, round]);
     };

     return (
       <GameContext.Provider value={{ rounds, updateRound, deleteRound, addRound }}>
         {children}
       </GameContext.Provider>
     );
   };

   export const useGameContext = () => {
     const context = useContext(GameContext);
     if (!context) {
       throw new Error('useGameContext must be used within a GameProvider');
     }
     return context;
   };