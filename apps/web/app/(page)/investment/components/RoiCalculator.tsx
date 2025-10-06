"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import three from "@/assets/investment/three.webp";

export default function RoiCalculator() {
	const [interestRate, setInterestRate] = useState(7.2); 
	const [investmentAmount, setInvestmentAmount] = useState("");
	const [currency, setCurrency] = useState("NGN");
	const [years, setYears] = useState("2");
	const [roi, setRoi] = useState<{ profit: number; total: number } | null>(
		null
	);

	const calculateROI = () => {
		const principal = parseFloat(investmentAmount);
		const rate = interestRate / 100;
		const time = parseInt(years);

		if (isNaN(principal) || principal <= 0) {
			alert("Please enter a valid investment amount");
			return;
		}

		
		const profit = principal * rate * time;
		const total = principal + profit;

		setRoi({ profit, total });
	};

	return (
		<div className="relative w-full min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-8">
			
			<Image src={three} alt="Skyscraper" className="object-cover" fill />
			<div className="absolute inset-0 bg-black opacity-60 z-10" />

			<div className="container mx-auto px-4 lg:px-16 z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
				
				<div className="w-full lg:w-1/2 text-white">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Calculate Your ROI
					</h1>
					<p className="text-lg md:text-xl opacity-90 mb-12">
						Estimate your investment returns using our calculator to project
						profits with simple interest.
					</p>

					<div className="space-y-4">
						<h2 className="text-2xl md:text-3xl font-semibold mb-4">
							Want to talk about this property?
						</h2>
						<div className="flex items-center gap-3">
							<FaPhoneAlt className="h-5 w-5 text-white" />
							<span className="text-lg">+234 812 345 67</span>
						</div>
						<div className="flex items-center gap-3">
							<FaEnvelope className="h-5 w-5 text-white" />
							<span className="text-lg">tetramanor@mail.com</span>
						</div>
					</div>
				</div>

				
				<div className="w-full lg:w-1/2">
					<div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
						<h3 className="text-xl font-semibold mb-6">I want to invest</h3>

						
						<div className="flex gap-4 mb-8">
							<select
								value={currency}
								onChange={(e) => setCurrency(e.target.value)}
								className="w-28 border rounded-md px-3 py-2 text-sm"
							>
								<option value="NGN">NGN</option>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="GBP">GBP</option>
							</select>

							<input
								type="number"
								placeholder="Amount"
								className="flex-1 border rounded-md px-4 py-2"
								value={investmentAmount}
								onChange={(e) => setInvestmentAmount(e.target.value)}
							/>
						</div>

						<div className="mb-8">
							<div className="flex justify-between mb-2">
								<span className="font-medium">Annual Interest Rate</span>
								<span className="font-semibold text-green-700">
									{interestRate}%
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="text-sm text-gray-500">1%</span>
								<input
									type="range"
									min="1"
									max="50"
									step="0.1"
									value={interestRate}
									onChange={(e) => setInterestRate(Number(e.target.value))}
									className="flex-1 accent-green-700"
								/>
								<span className="text-sm text-gray-500">50%</span>
							</div>
						</div>

						
						<div className="mb-8">
							<label className="font-medium mb-2 block">
								Estimate my return over...
							</label>
							<select
								value={years}
								onChange={(e) => setYears(e.target.value)}
								className="w-full border rounded-md px-3 py-2 text-sm"
							>
								<option value="1">1 year</option>
								<option value="2">2 years</option>
								<option value="3">3 years</option>
								<option value="5">5 years</option>
								<option value="10">10 years</option>
							</select>
						</div>

						
						<button
							className="w-full bg-green-700 hover:bg-green-800 text-white rounded-sm py-2 text-lg font-medium transition-colors"
							type="button"
							onClick={calculateROI}
						>
							Calculate ROI
						</button>

					
						{roi && (
							<div className="mt-6 p-4 bg-green-100 rounded-md text-center space-y-2">
								<p className="text-lg font-semibold text-green-800">
									Profit: {currency} {roi.profit.toLocaleString()}
								</p>
								<p className="text-lg font-semibold text-green-900">
									Total Return: {currency} {roi.total.toLocaleString()}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
