import jsPDF from "jspdf"
import type { AnalysisResult } from "./types"

export function exportToPDF(subject: string, analysis: AnalysisResult) {
  const doc = new jsPDF()
  let yPosition = 20

  // Configuration des polices
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)

  // Titre
  doc.text("Exo Philos - Analyse de dissertation philosophique", 20, yPosition)
  yPosition += 15

  // Sujet
  doc.setFontSize(14)
  doc.text("Sujet :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)

  // Gestion du texte long pour le sujet
  const subjectLines = doc.splitTextToSize(subject, 170)
  doc.text(subjectLines, 20, yPosition)
  yPosition += subjectLines.length * 6 + 10

  // Thème principal
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Thème principal :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.text(analysis.mainTheme, 20, yPosition)
  yPosition += 15

  // Notions clés
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Notions philosophiques clés :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.text(analysis.keyConcepts.join(", "), 20, yPosition)
  yPosition += 15

  // Problématique
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Problématique :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  const problematicLines = doc.splitTextToSize(analysis.problematic, 170)
  doc.text(problematicLines, 20, yPosition)
  yPosition += problematicLines.length * 6 + 15

  // Plan dialectique
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Plan dialectique :", 20, yPosition)
  yPosition += 10

  analysis.dialecticalPlan.forEach((part, index) => {
    // Vérifier si on a besoin d'une nouvelle page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    const titleLines = doc.splitTextToSize(part.title, 170)
    doc.text(titleLines, 20, yPosition)
    yPosition += titleLines.length * 6 + 5

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    const descLines = doc.splitTextToSize(part.description, 170)
    doc.text(descLines, 25, yPosition)
    yPosition += descLines.length * 5 + 5

    part.keyArguments.forEach((arg) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      const argLines = doc.splitTextToSize(`• ${arg}`, 165)
      doc.text(argLines, 30, yPosition)
      yPosition += argLines.length * 5 + 2
    })
    yPosition += 8
  })

  // Nouvelle page pour les références si nécessaire
  if (yPosition > 200) {
    doc.addPage()
    yPosition = 20
  }

  // Philosophes
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Philosophes de référence :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.text(analysis.philosophers.join(", "), 20, yPosition)
  yPosition += 15

  // Exemples
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text("Exemples pour l'argumentation :", 20, yPosition)
  yPosition += 8
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)

  analysis.examples.forEach((example) => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }
    const exampleLines = doc.splitTextToSize(`• ${example}`, 170)
    doc.text(exampleLines, 20, yPosition)
    yPosition += exampleLines.length * 5 + 3
  })

  // Pied de page
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(`Exo Philos - Page ${i}/${pageCount}`, 20, 285)
    doc.text(new Date().toLocaleDateString("fr-FR"), 150, 285)
  }

  // Téléchargement
  const filename = `analyse-philo-${Date.now()}.pdf`
  doc.save(filename)
}
