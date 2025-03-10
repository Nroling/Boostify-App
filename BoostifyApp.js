import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function BoostifyApp() {
  const [songQueue, setSongQueue] = useState([]);
  const [songRequest, setSongRequest] = useState('');
  const [boostifyWallet, setBoostifyWallet] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleRequestSong = async () => {
    if (boostifyWallet < 5) {
      alert('Insufficient balance. Please load your Boostify Wallet.');
      return;
    }
    setBoostifyWallet(boostifyWallet - 5);
    const newSong = {
      name: songRequest,
      tips: 0
    };
    setSongQueue([...songQueue, newSong]);
    setSongRequest('');
  };

  const handleTipSong = (index) => {
    if (boostifyWallet < 2) {
      alert('Insufficient balance. Please load your Boostify Wallet.');
      return;
    }
    setBoostifyWallet(boostifyWallet - 2);
    const updatedQueue = [...songQueue];
    updatedQueue[index].tips += 2;
    updatedQueue.sort((a, b) => b.tips - a.tips);
    setSongQueue(updatedQueue);
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error('Stripe not initialized');
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      alert('Payment successful! Wallet loaded.');
      setBoostifyWallet(boostifyWallet + 20);
    }
  };

  const handleDirectTip = () => {
    if (boostifyWallet < 5) {
      alert('Insufficient balance. Please load your Boostify Wallet.');
      return;
    }
    setBoostifyWallet(boostifyWallet - 5);
    alert('You tipped $5 directly to the performer!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Boostify - Live Song Requests & Tips</h1>
      <p className="text-lg font-semibold">Wallet Balance: ${boostifyWallet}</p>

      <Input
        value={songRequest}
        onChange={(e) => setSongRequest(e.target.value)}
        placeholder="Request a song ($5)"
      />
      <Button onClick={handleRequestSong} className="mt-2">Request Song</Button>

      <div className="mt-6">
        {songQueue.map((song, index) => (
          <Card key={index} className="mb-4">
            <CardContent>
              <p className="text-lg font-semibold">{song.name}</p>
              <p>Tips: ${song.tips}</p>
              <Button onClick={() => handleTipSong(index)}>Tip $2 to Boost</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Complete Payment</h2>
        <CardElement />
        <Button onClick={handlePayment} className="mt-4">Load $20 into Boostify Wallet</Button>
        <Button onClick={handleDirectTip} className="mt-4">Tip $5 to Performer</Button>
      </div>
    </div>
  );
}
