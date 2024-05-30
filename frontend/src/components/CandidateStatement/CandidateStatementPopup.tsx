import React from "react";
import DOMPurify from "dompurify";


import { compiler } from "markdown-to-jsx";

import { Candidate } from "../../types/Candidate.type";

import "./CandidateStatementPopup.css";

export function CandidateStatementPopup({
  candidate,
  visible,
  close
}: {
  candidate: Candidate,
  visible: boolean,
  close: () => void;
}) {
  return (
    visible ?
      <div className="candidate-statement-popup">
        <div className="candidate-statement-modal">
          <p className="candidate-statement-header">
            <i>{candidate.name}'s</i> statement
          </p>
          <div className="candidate-statement">
            {compiler(DOMPurify.sanitize(candidate.statement))}
          </div>
          <button
            className="close-candidate-statement modal-button"
            onClick={() => close()}
          >Close</button>
        </div>
      </div>
      : <></>
  )
}







/**
 *  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames ac. At quis risus sed vulputate odio ut. Egestas dui id ornare arcu odio ut. Duis convallis convallis tellus id interdum velit laoreet. Dolor purus non enim praesent elementum facilisis. Id volutpat lacus laoreet non curabitur. Convallis aenean et tortor at risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus. Massa id neque aliquam vestibulum morbi. Pellentesque adipiscing commodo elit at imperdiet dui. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Commodo nulla facilisi nullam vehicula. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Dui nunc mattis enim ut tellus elementum sagittis. Sit amet mauris commodo quis imperdiet. Vitae suscipit tellus mauris a diam maecenas sed. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames ac. At quis risus sed vulputate odio ut. Egestas dui id ornare arcu odio ut. Duis convallis convallis tellus id interdum velit laoreet. Dolor purus non enim praesent elementum facilisis. Id volutpat lacus laoreet non curabitur. Convallis aenean et tortor at risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus. Massa id neque aliquam vestibulum morbi. Pellentesque adipiscing commodo elit at imperdiet dui. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Commodo nulla facilisi nullam vehicula. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Dui nunc mattis enim ut tellus elementum sagittis. Sit amet mauris commodo quis imperdiet. Vitae suscipit tellus mauris a diam maecenas sed. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames ac. At quis risus sed vulputate odio ut. Egestas dui id ornare arcu odio ut. Duis convallis convallis tellus id interdum velit laoreet. Dolor purus non enim praesent elementum facilisis. Id volutpat lacus laoreet non curabitur. Convallis aenean et tortor at risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus. Massa id neque aliquam vestibulum morbi. Pellentesque adipiscing commodo elit at imperdiet dui. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Commodo nulla facilisi nullam vehicula. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Dui nunc mattis enim ut tellus elementum sagittis. Sit amet mauris commodo quis imperdiet. Vitae suscipit tellus mauris a diam maecenas sed. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.
 */