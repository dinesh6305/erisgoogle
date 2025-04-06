import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Dialog } from "../../components/ui/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import Adminorderview from "@/assets/components/admin-view/adminorders-vew";




function Adminorders() {
    return (

        <div>
            <Adminorderview/>
        </div>
    );
}

export default Adminorders;