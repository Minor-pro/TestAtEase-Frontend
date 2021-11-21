import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";

export const generateDoc=(testQuestions, fileName)=>{ 
    //console.log(atob(testQuestions[1].images[0]))
    const docSections=[];
    
    testQuestions.forEach((q,qi)=>{
        const child=[];
        child.push(new Paragraph({
            children: [new TextRun({text:`Question ${qi+1}:`, bold:true})],
        }))
        console.log(child)
        q.images.forEach((image,i)=>{
            const img = new Image();
                img.src = image;
                img.onload = function() {
                    console.log(img.naturalWidth,imgWidth,img.naturalHeight,imgHeight)
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
    console.log(docSections);
    const doc = new Document({
        sections: docSections
    });
    
    Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `${fileName}.docx`);
        console.log("Document created successfully");
    });
}