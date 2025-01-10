   // src/App.tsx
   import React from 'react';
   import GrowTent from './components/GrowTent';

   const App: React.FC = () => {
       return (
           <div>
               <h1>Grow Tent Simulation</h1>
               <GrowTent />
           </div>
       );
   };

   export default App;