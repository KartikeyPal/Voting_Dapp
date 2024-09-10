//this is step 8

import { createBrowserRouter } from "react-router-dom";
import CandidateRegistration from "../pages/candidate/CandidateRegistration";
import VoterRegistration from "../pages/voter/VoterRegistration";
import VoterDisplay from "../pages/voter/VoterDisplay";
import CandidateDisplay from "../pages/candidate/CandidateDisplay";
import Wallet from "../context/Wallet";
import NavigationBar from '../navigation/NavigationBar'
import ElectionCommission from "../pages/electionCommision/ElectionCommission";
import Token from "../pages/tokenExchange/Token";
import Vote from '../pages/vote/Vote'

export const routes = createBrowserRouter([
    {
        path:"/",
        element:(
            <div>
                <NavigationBar/>
                <Wallet/>
            </div>
        )
    },

    {
        path:"Candidate-Register",
        element:(
            <div>
                <NavigationBar/>
                <CandidateRegistration/>
            </div>
        )
    },

    {
        path:"Voter-Register",
        element:(
            <div>
                <NavigationBar/>
                <VoterRegistration/>
            </div>    
        )
    },

    {
        path:"Election-Commission",
        element:(
            <div>
                <NavigationBar/>
                <ElectionCommission/>
            </div>
        )
    },

    {
        path:"Candidate-List",
        element:(
            <div>
                <NavigationBar/>
                <CandidateDisplay/>
            </div>
                
        )
    },

    {
        path:"Voter-List",
        element:(
            <div>
                <NavigationBar/>
                <VoterDisplay/>
            </div>
        ) 
    },
    {
        path:"Token-Exchange",
        element:(
            <div>
                <NavigationBar/>
                <Token/>
            </div>
        ) 
    },
    {
        path:"Vote-Here",
        element:(
            <div>
                <NavigationBar/>
                <Vote/>
            </div>
        ) 
    },
]);