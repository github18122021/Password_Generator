"use client";
import React, { ChangeEvent, useState } from "react";
import { generate } from "generate-password";

function Page() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    length: 10,
    numbers: false,
    symbols: false,
    lowercase: true,
    uppercase: true,
  });
  const [isCopied, setIsCopied] = useState("Copy Password");

  const generatePassword = () => { 
    // setPassword("Generated Password");
    setPassword(generate({...options}));
  };

  const handleCheckboxChange = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setOptions({ ...options, [name]: checked });
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setIsCopied("Password Copied!");

    setTimeout(() => {
      setIsCopied("Copy Password");
    }, 2000);
  }

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-blue-700 font-bold text-center mb-6">Password Generator</h1>
        <form onSubmit={(e) => { e.preventDefault(); generatePassword(); }}>
          <section className="mb-4">
            <label htmlFor="length" className="block mb-2">Length: </label>
            <input type="number" name="length" id="length" value={options.length} onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })} className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700" />
          </section>
          <section className="mb-4">
            <label className="block mb-2">Options:</label>
            <div className="flex">
              <input type="checkbox" name="numbers" checked={options.numbers} onChange={handleCheckboxChange} className="mr-2" />
              <label htmlFor="numbers" className="mr-4">Numbers</label>
              <input type="checkbox" name="symbols" checked={options.symbols} onChange={handleCheckboxChange} className="mr-2" />
              <label htmlFor="symbols" className="mr-4">Symbols</label>
              <input type="checkbox" name="lowercase" checked={options.lowercase} onChange={handleCheckboxChange} className="mr-2" />
              <label htmlFor="lowercase" className="mr-4">Lowercase</label>
              <input type="checkbox" name="uppercase" checked={options.uppercase} onChange={handleCheckboxChange} className="mr-2" />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
          </section>
          <section className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Generate Password</button>
          </section>
        </form>
        {password && (
          <section className="mt-6">
            <label className="block mb-2">Generated Password:</label>
            {/* <input type="text" value={password} readOnly className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 bg-gray-100" /> */}
            <p className="max-w-[30rem] border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 bg-gray-100 break-all">{password}</p>
            <section className="text-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={copyPassword}>{isCopied}</button>
            </section>
          </section>
        )}
      </div>
    </div>
  );
}

export default Page;
