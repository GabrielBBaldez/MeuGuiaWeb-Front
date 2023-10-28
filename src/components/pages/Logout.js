import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Input from "../Login/Input/input";
import Button from "../Login/Button/button";

function Logout () {
        const {signout} = useAuth();
        const navigate = useNavigate();
        
        signout();
}
export default Logout;
