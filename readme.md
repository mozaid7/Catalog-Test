# Polynomial Interpolation Solver

This project implements a polynomial interpolation solver using Lagrange Interpolation.
It reads input from JSON test files, converts values from different number bases into decimal, and calculates the constant term c of the polynomial.

# Functions Overview
convertToDecimal(value, base)
Converts a number from any base (2–16) into decimal.

lagrangeInterpolation(points)
Performs Lagrange interpolation to compute polynomial values.

solvePolynomial(data)
Reads the test case data, selects points, and finds the constant term c