import {render, fireEvent, screen} from '@testing-library/react'
import Login from '../pages/Login'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();
// const wrapper = ({ children }) => (
//   <QueryClientProvider client={queryClient}>
//     {children}
//   </QueryClientProvider>
// );

// const { result } = renderHook(() => Login, { wrapper });

// await waitFor(() => expect(result.current.isSuccess).toBe(true));



test('Email input should be empty', () => { 
    render(<Login/>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)
    expect(emailInputEle.value).toBe("");
 })

test("password input should be empty", () => {
    render(<Login/>)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    expect(passInputEle.value).toBe("")
})

test("Login button should be disabled", () => {
    render(<Login/>)
    const buttonEle = screen.getByRole("button")
    expect(buttonEle).toBeDisabled()
})

test("Email input should change", () => {
    render(<Login/>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)
    const testValue = "test"
    fireEvent.change(emailInputEle, { target: {value: testValue}})
    expect(emailInputEle.value).toBe(testValue)
})

test("Password input should change", () => {
    render(<Login/>)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    const testValue = "test"
    fireEvent.change(passInputEle, { target: {value: testValue}})
    expect(passInputEle.value).toBe(testValue)
})

test("Button should not be disabled when input exists", ()=> {
    render(<Login/>)
    const emailInputEle = screen.getByPlaceholderText(/email address/i)
    const passInputEle = screen.getByPlaceholderText(/password/i)
    const buttonEle = screen.getByRole("button")
    const testValue = "test"
    fireEvent.change(emailInputEle, {target: {value: testValue}})
    fireEvent.change(passInputEle, {target: {value: testValue}})
    expect(buttonEle).not.toBeDisabled()
})
