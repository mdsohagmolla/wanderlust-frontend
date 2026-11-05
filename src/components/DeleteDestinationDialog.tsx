
"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./ui/button";

import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
// type declaration:
interface Idestination{
     _id: string,
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
}



const DeleteDestinationDialog = ({destination}:{destination:Idestination}) => {

   

    // Delete APi call

    const handleDleteDestination = async()=>{
         // Secure backend
         const token = await getTokenFromClient();
         


         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,{
            method: "DELETE",
            headers:{
            
            authorization: `Bearer ${token}`
        },
         })
         const data = await res.json();
          //  Redirect:
        redirect('/destinations')
         console.log('delete er data', data)

       
    }



    return (
        <div>
            <AlertDialog>
                {/* delete button */}
                <AlertDialogTrigger render={<Button
                    variant="outline"
                    
                   
                    className="h-9 gap-1.5 border-destructive/40 px-3.5 text-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/50"
                >
                    <Trash2 aria-hidden="true" />
                    Delete
                </Button>}>
                    Show Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDleteDestination}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default DeleteDestinationDialog;