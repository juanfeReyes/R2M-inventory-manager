import React, { useState } from "react";
import { getPackages } from "../clients/InventoryClient";

export default function InventoryForm() {
  const [inventoryName, setInventoryName] = useState("")
  const [amount, setAmount] = useState("")
  const [weight, setWeight] = useState("")

  async function submit() {
    var packageCellar = {
      name: inventoryName,
      amount: amount,
      weight: weight
    }
    
    const packages = await getPackages();
    console.log(packages)
  }

  return (
    <div>
        <p>Name:</p>
        <input value={inventoryName} onChange={(e) => setInventoryName(e.target.value)}></input>
        <p>Amount:</p>
        <input value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <p>Weight:</p>
        <input value={weight} onChange={(e) => setWeight(e.target.value)}></input>
        <button onClick={() => submit()}>Save</button>
    </div>
  )
}