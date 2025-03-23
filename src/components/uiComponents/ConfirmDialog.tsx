import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
  } from "@/components/ui/dialog";
  import { useState, useEffect } from "react";
  import { Button } from "../ui/button";
  import { useMutation } from "@tanstack/react-query";
  import api from "../../axiosService";
  import { toast } from "sonner";
  import { useNavigate } from "react-router-dom";
  
  const ConfirmDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const mutation = useMutation({
      mutationFn: () => {
        // Your logout logic here
        return api.post("/user/logout");
      },
      onSuccess: () => {
        // Update the state to close the dialog
        toast.success("Logged out successfully!");
        navigate("/login");

        setIsOpen(false);
      },
      onError: (error) => {
        toast.error("Something went wrong!");
        console.error(error);
      },
    }); 

    const logoutHandler = () => {
        mutation.mutate();
        setIsOpen(false);
      }
  
    // Automatically open the dialog when the component renders
    useEffect(() => {
      setIsOpen(true);
    }, []);
  
    return (
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
               You want to logout
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                if(user.role === "recruiter") {
                  navigate("/dashboard");
                } else {
                  navigate("/courses");
                }
                setIsOpen(false);
              }}>Cancel</Button>
              <Button variant="destructive" onClick={logoutHandler}>Logout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default ConfirmDialog;
  