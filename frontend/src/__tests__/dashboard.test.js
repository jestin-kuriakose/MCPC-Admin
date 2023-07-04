import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../context/AuthProvider"
import Dashboard from "../components/Dashboard"
import { render, screen } from "@testing-library/react"

const MockDashboardComponent = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Dashboard/>
            </BrowserRouter>
        </AuthProvider>
    )
}

jest.mock("axios", ()=> ({
    __esModule: true,
    default: {
        create: () => ({
            get: () => ({
                data: {count: 10}
            })
        })
    }
}))

describe("Dashboard Component", () => {
    test("Total Members should have a number", async () => {
        render(<MockDashboardComponent/>)
        const memberDiv = await screen.findByTestId("totalMembers")
        console.log(memberDiv)
        expect(memberDiv).toBeInTheDocument()
    })
})