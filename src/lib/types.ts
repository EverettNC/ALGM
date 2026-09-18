export type CapLevel = "yes" | "limited" | "no";

export type CapabilityId =
  | "swarm"
  | "tools"
  | "computer_use"
  | "vision"
  | "image_gen"
  | "video"
  | "voice"
  | "code_exec"
  | "web_search"
  | "long_context"
  | "fine_tune"
  | "offline"
  | "on_device";

export type EnvKind = "web" | "api" | "local" | "enterprise";

export type TrainingPolicy =
  | "never"
  | "opt_out"
  | "opt_in"
  | "default_on"
  | "unknown";

export type DataPolicy = {
  leavesDevice: boolean;
  training: TrainingPolicy;
  retention: string;
  subprocessors: string[];
  honesty: number;
  honestyWhy: string;
};

export type Environment = {
  id: string;
  label: string;
  kind: EnvKind;
  region: string;
  facility: string;
  capabilities: Partial<Record<CapabilityId, CapLevel>>;
  notes: string;
  data: DataPolicy;
};

export type Model = {
  id: string;
  name: string;
  short: string;
  family: string;
  provider: string;
  aliases: string[];
  summary: string;
  origin: string;
  defaultEnv: string;
  environments: Environment[];
};

export type VerdictKind = "allowed" | "limited" | "blocked" | "privacy" | "unknown";

export type Alternative = {
  modelId: string;
  envId: string;
  why: string;
  level: CapLevel;
};

export type Verdict = {
  id: string;
  at: number;
  query: string;
  kind: VerdictKind;
  headline: string;
  body: string;
  teach: string;
  modelId?: string;
  envId?: string;
  capability?: CapabilityId;
  alternatives: Alternative[];
  honestyNote: string;
  steps: string[];
};

export type InvestigationStatus =
  | "held"
  | "inspecting"
  | "inspected"
  | "cleared"
  | "quarantined";

export type InvestigationKind = "update" | "upload" | "policy";

export type Investigation = {
  id: string;
  title: string;
  source: string;
  kind: InvestigationKind;
  failedAt: number;
  bytesHeld: number;
  status: InvestigationStatus;
  stage: string;
};

export type Payload = {
  checksum: string;
  error: string;
  excerpt: string;
  recommendation: string;
  honestyNote: string;
};

export type HonestySession = {
  id: string;
  modelId: string;
  envId: string;
  claimedOrigin: string;
  observedPath: string[];
  honesty: number;
  /** false when the atlas has no door for what was observed; then honesty carries no meaning */
  scored: boolean;
  note: string;
  at: number;
  drift: boolean;
};

export type Lesson = {
  slug: string;
  title: string;
  kicker: string;
  minutes: number;
  applies: string[];
  body: string[];
  takeaway: string;
};
