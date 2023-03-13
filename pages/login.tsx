import { UserInfo } from "os";
import React, { useState } from "react";
const fs = require("fs");
interface User {
    pin: string;
    name: string;
    phone: string;
  }
export const Login = () => {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the form
    if (!pin && !(name && phone)) {
      alert("Please enter the required information.");
      return;
    }

    // Check if the user is an existing user
    if (pin) {
      // Read the user's information from a JSON file
      fs.readFile("users.json", (error: NodeJS.ErrnoException, data: Buffer) => {
        if (error) {
          console.error(error);
        }

        const users = JSON.parse(data.toString());

        // Find the user with the entered PIN code
        const user: User | undefined = users.find((user: User) => user.pin === pin);

        // Check if the user exists
        if (!user) {
          alert("The entered PIN code is invalid.");
          return;
        }

        // Redirect the user to the index page
        // ...
      });
    } else {
      // Generate a new PIN code
      const newPin = Math.floor(Math.random() * 100000000) + 10000000;

      // Save the user's information with the generated PIN code
      fs.readFile("users.json", (error: Error, data: Buffer) => {
        if (error) {
          console.error(error);
        }

        let users = JSON.parse(data.toString());
        users.push({ pin: newPin, name, phone });

        fs.writeFile("users.json", JSON.stringify(users), (error: Error) => {
          if (error) {
            console.error(error);
          }
        });
      });

      // Redirect the user to the index page
      // ...
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isNewUser ? (
        <>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="pin">PIN:</label>
          <input
            type="text"
            id="pin"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            />
            </div>
            )}
            <div>
            <button type="submit">Submit</button>
            </div>
            <div>
            <p>
            Don't have a PIN?{" "}
            <a onClick={() => setIsNewUser(!isNewUser)}>Click here to register</a>
            </p>
            </div>
            </form>
            );
            };
