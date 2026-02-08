export interface CodeProject {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

export const codeProjects: CodeProject[] = [
  {
    title: "Ableton Assistant",
    description:
      "Conversational agent for Ableton Live built on RAG and LLM agents. LangChain, OpenAI, FAISS vector store, Flask backend with SSE streaming, React frontend. Voice interaction (STT/TTS) and multilingual support.",
    tags: ["LangChain", "OpenAI", "FAISS", "Flask", "React"],
    github: "https://github.com/mobenet/ableton-assistant",
  },
  {
    title: "Motion Synthesizer",
    description:
      "Interactive system translating hand movement into sound. Computer vision hand tracking via MediaPipe, converting gestures into OSC messages that control parameters in Pure Data or Ableton Live.",
    tags: ["MediaPipe", "OpenCV", "OSC", "Python"],
    github: "https://github.com/mobenet/motion-synth",
  },
  {
    title: "ImaGenAI App",
    description:
      "NLP pipeline for analyzing generative image models. Reddit scraping, sentiment analysis, thematic clustering and automatic content generation to compare models by category.",
    tags: ["HuggingFace", "TF-IDF", "LDA", "OpenAI"],
    github: "https://github.com/mobenet/ai-image-model-review-app",
  },
  {
    title: "Fake News Detector",
    description:
      "ML classification system for detecting fake news. Full pipeline: preprocessing, TF-IDF vectorization, Random Forest classification with cross-validation.",
    tags: ["Scikit-learn", "NLTK", "Pandas", "Python"],
    github: "https://github.com/mobenet/fake-news-detector",
  },
  {
    title: "LLM Fine-Tuning",
    description:
      "Efficient fine-tuning of language models for document classification using LoRA / PEFT with Hugging Face Transformers.",
    tags: ["LoRA", "PEFT", "HuggingFace", "PyTorch"],
    github: "https://github.com/mobenet",
  },
  {
    title: "CNN Image Classifier",
    description:
      "Convolutional neural network for animal species classification. VGG16 transfer learning with custom top layers, dropout and data augmentation.",
    tags: ["TensorFlow", "Keras", "VGG16", "Python"],
    github: "https://github.com/mobenet/cnn-image-classification",
  },
];
