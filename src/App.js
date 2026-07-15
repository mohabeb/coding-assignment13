import { useState } from "react";
import "./App.css";
import { Alert, Badge, Button, Card, Input } from "./components";

const qualityChecks = [
  {
    name: "Prettier",
    detail: "Checks that source files follow one consistent format.",
  },
  {
    name: "ESLint",
    detail: "Finds JavaScript and React code-quality problems.",
  },
  {
    name: "Jest Tests",
    detail: "Confirms the component behaviours still work.",
  },
  {
    name: "GitHub Actions",
    detail: "Repeats every check after code is pushed to GitHub.",
  },
];

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "The UI Garden production build is running successfully.",
  );

  const handleDemo = () => {
    setMessage(
      email.trim()
        ? `Demo action completed for ${email.trim()}.`
        : "Enter an email address to personalize the demo message.",
    );
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">WEBD-3012 · Coding Assignment 13</p>
          <h1>UI Garden</h1>
          <p className="hero__description">
            A reusable React component library protected by local pre-commit checks and a
            GitHub Actions continuous-integration workflow.
          </p>
        </div>
        <Badge tone="success">Production Ready</Badge>
      </header>

      <main>
        <section aria-labelledby="quality-heading" className="section-block">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Automated workflow</p>
              <h2 id="quality-heading">Code quality checks</h2>
            </div>
            <code>npm run quality</code>
          </div>

          <div className="quality-grid">
            {qualityChecks.map((check) => (
              <Card key={check.name} title={check.name} eyebrow="PASS REQUIRED">
                <p>{check.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="library-heading" className="section-block">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Reusable interface elements</p>
              <h2 id="library-heading">Component library</h2>
            </div>
          </div>

          <div className="component-layout">
            <Card
              title="Buttons and badges"
              eyebrow="ACTIONS"
              footer={<Badge tone="neutral">Accessible focus states</Badge>}
            >
              <div className="demo-row">
                <Button onClick={() => setMessage("Primary button selected.")}>
                  Primary
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setMessage("Secondary button selected.")}
                >
                  Secondary
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setMessage("Danger button selected.")}
                >
                  Danger
                </Button>
              </div>
              <div className="demo-row">
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </div>
            </Card>

            <Card title="Form input" eyebrow="FORM CONTROL">
              <Input
                id="demo-email"
                label="Email address"
                type="email"
                placeholder="student@example.com"
                value={email}
                helpText="This field demonstrates a labelled reusable input component."
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button onClick={handleDemo}>Run demo action</Button>
            </Card>
          </div>

          <Alert title="Live component message" tone="info">
            {message}
          </Alert>
        </section>

        <section aria-labelledby="delivery-heading" className="delivery-panel">
          <div>
            <p className="section-kicker">CI/CD summary</p>
            <h2 id="delivery-heading">Two protection layers</h2>
          </div>
          <ol>
            <li>
              <strong>Local:</strong> Husky runs Prettier, ESLint, and tests before a Git
              commit is created.
            </li>
            <li>
              <strong>Remote:</strong> GitHub Actions repeats the checks and production
              build after every push or pull request.
            </li>
          </ol>
        </section>
      </main>

      <footer>
        <span>Student: Mohamed Habeeb</span>
        <span>Docker port: 8018</span>
      </footer>
    </div>
  );
}

export default App;
