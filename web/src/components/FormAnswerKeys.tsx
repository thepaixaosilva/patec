import React, { useState } from "react";

interface Subject {
  id: number;
  name: string;
}

interface AnswerKeys {
  [subjectId: number]: string[];
}

const mockSubjects: Subject[] = [
  { id: 1, name: "Matemática" },
  { id: 2, name: "Português" },
  { id: 3, name: "Ciências" },
];

const AnswerKeyModal = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [answerKeys, setAnswerKeys] = useState<AnswerKeys>({});

  const updateAnswer = (subjectId: number, questionIndex: number, answer: string) => {
    setAnswerKeys((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId]
        ? prev[subjectId].map((ans, idx) => (idx === questionIndex ? answer : ans))
        : Array(5).fill("").map((_, idx) => (idx === questionIndex ? answer : "")),
    }));
  };

  const handleSubmitAnswerKey = () => {
    console.log("Gabarito Salvo:", answerKeys);
    alert("Gabarito salvo com sucesso!");
  };

  const closeAnswerKeyModal = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cadastrar/Editar Gabarito
        </h2>

        {/* Seleção de Disciplina */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Selecione a Disciplina</label>
          <select
            value={selectedSubject?.id || ""}
            onChange={(e) =>
              setSelectedSubject(
                mockSubjects.find((subject) => subject.id === parseInt(e.target.value)) || null
              )
            }
            className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>Escolha uma disciplina</option>
            {mockSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>

        {/* Gabarito */}
        {selectedSubject && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Gabarito de {selectedSubject.name}
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((questionNumber) => (
                <div key={questionNumber} className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-700">Questão {questionNumber}</span>
                  <div className="flex space-x-2">
                    {["A", "B", "C", "D", "E"].map((option) => (
                      <button
                        key={option}
                        onClick={() => updateAnswer(
                          selectedSubject.id,
                          questionNumber - 1,
                          option
                        )}
                        className={`
                          w-10 h-10 rounded-full font-semibold
                          ${
                            answerKeys[selectedSubject.id]?.[questionNumber - 1] === option
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }
                          hover:shadow-lg transition-transform transform hover:scale-110
                        `}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex justify-between mt-6">
          <button
            onClick={closeAnswerKeyModal}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmitAnswerKey}
            disabled={!selectedSubject}
            className={`px-6 py-2 rounded-lg text-white font-bold ${
              selectedSubject ? "bg-green-500 hover:bg-green-600" : "bg-gray-300"
            } transition-colors`}
          >
            Salvar Gabarito
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerKeyModal;
