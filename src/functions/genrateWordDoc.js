import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";

export const generateDoc=(testQuestions, fileName)=>{ 
    const docSections=[];
    
    testQuestions.forEach((q,qi)=>{
        const child=[];
        child.push(new Paragraph({
            children: [new TextRun({text:`Question ${qi+1}:`, bold:true})],
        }))
        q.images.forEach((image,i)=>{
            const img = new Image();
                img.src = image;
                img.onload = function() {
                    imgWidth = img.naturalWidth;
                    imgHeight = img.naturalHeight;
                }
            let imgWidth = 0;
            let imgHeight = 0;
            if(q.images[i]){
                
            }
            child.push(new Paragraph(q.text[i]));
            child.push(
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: q.images[i],
                            transformation: {
                                width:img.naturalWidth,
                                height: img.naturalHeight
                            }
                        })
                    ]
                })
            )
        })
        docSections.push({children:child})
    })
    const doc = new Document({
        sections: docSections
    });
    
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${fileName}.docx`);
    });
}