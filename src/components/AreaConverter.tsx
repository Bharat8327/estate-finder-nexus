
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

// Conversion rates to square meters (1 unit = X square meters)
const conversionRates: Record<string, number> = {
  "square_meter": 1,
  "square_foot": 0.092903,
  "square_yard": 0.836127,
  "acre": 4046.86,
  "hectare": 10000,
  "bigha": 1618.74, // Standard bigha, can vary by region
  "marla": 25.2929,
  "kanal": 505.857,
  "ground": 203.35,
};

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<string>("square_foot");
  const [outputUnit, setOutputUnit] = useState<string>("square_meter");
  const [result, setResult] = useState<string>("");
  
  const handleConvert = () => {
    const value = parseFloat(inputValue);
    
    if (isNaN(value) || value < 0) {
      setResult("Please enter a valid number");
      return;
    }
    
    // Convert input to square meters first, then to output unit
    const valueInSquareMeters = value * conversionRates[inputUnit];
    const convertedValue = valueInSquareMeters / conversionRates[outputUnit];
    
    setResult(convertedValue.toFixed(2));
  };
  
  const handleSwapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
    setResult("");
  };
  
  const getUnitLabel = (unitKey: string): string => {
    const labels: Record<string, string> = {
      "square_meter": "Square Meters (m²)",
      "square_foot": "Square Feet (ft²)",
      "square_yard": "Square Yards (yd²)",
      "acre": "Acres",
      "hectare": "Hectares",
      "bigha": "Bigha",
      "marla": "Marla",
      "kanal": "Kanal",
      "ground": "Ground",
    };
    
    return labels[unitKey] || unitKey;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Converter</CardTitle>
        <CardDescription>
          Convert between different land area measurement units
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-value">Value</Label>
              <Input
                id="input-value"
                type="number"
                min="0"
                step="any"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="input-unit">From</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="input-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conversionRates).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {getUnitLabel(unit)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="output-unit">To</Label>
              <div className="flex items-center space-x-2">
                <Select value={outputUnit} onValueChange={setOutputUnit}>
                  <SelectTrigger id="output-unit" className="flex-1">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(conversionRates).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {getUnitLabel(unit)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapUnits}
                  className="flex-shrink-0"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="sr-only">Swap units</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Button onClick={handleConvert} className="w-full">Convert</Button>
          
          {result && (
            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-gray-500">Result</div>
                <div className="text-2xl font-bold">
                  {inputValue} {getUnitLabel(inputUnit)} = {result} {getUnitLabel(outputUnit)}
                </div>
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-4">
            <p className="font-medium mb-1">Note:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Bigha size varies by region in India. This converter uses a standard Bigha.</li>
              <li>For specific regional units, please consult local authorities.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaConverter;
